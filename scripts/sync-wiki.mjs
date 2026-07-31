import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()
const sourceRoot = path.resolve(projectRoot, process.argv[2] || '.wiki-source')
const contentRoot = path.join(projectRoot, 'content/wiki')
const assetRoot = path.join(projectRoot, 'public/wiki-assets')
const siteBase = normalizeBase(process.env.WIKI_SITE_BASE || '')
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp'])
const ignoredDirectories = new Set(['.git', '.github', '.obsidian', '.trash', 'node_modules'])
const ignoredMarkdown = new Set(['readme.md'])

const categoryNames = {
  ai_agent: 'AI Agent',
  embedded: 'Embedded',
  linux: 'Linux',
  notes: 'Notes',
  robotics: 'Robotics'
}

function normalizeBase(value) {
  if (!value || value === '/') return ''
  return `/${value.replace(/^\/+|\/+$/g, '')}`
}

function slugify(value) {
  const normalized = value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
  const containsNonAscii = /[^\x00-\x7F]/.test(normalized)
  const asciiSlug = normalized
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
  if (!containsNonAscii) return asciiSlug || 'note'
  const suffix = createHash('sha1').update(normalized).digest('hex').slice(0, 7)
  return `${asciiSlug || 'note'}-${suffix}`
}

function displayName(value) {
  return value.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function yamlString(value) {
  return JSON.stringify(value)
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(absolutePath))
    else if (entry.isFile()) files.push(absolutePath)
  }

  return files
}

function getLastUpdated(relativePath) {
  try {
    return execFileSync(
      'git',
      ['-C', sourceRoot, 'log', '-1', '--format=%cs', '--', relativePath],
      { encoding: 'utf8' }
    ).trim()
  } catch (error) {
    return typeof error?.stdout === 'string' ? error.stdout.trim() : ''
  }
}

function removeFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) return markdown
  const end = markdown.indexOf('\n---\n', 4)
  return end === -1 ? markdown : markdown.slice(end + 5)
}

function headingSlug(value) {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
}

const allFiles = await walk(sourceRoot)
const markdownFiles = allFiles
  .filter(file => path.extname(file).toLowerCase() === '.md')
  .filter(file => !ignoredMarkdown.has(path.basename(file).toLowerCase()))

const notes = markdownFiles.map((absolutePath) => {
  const relativePath = path.relative(sourceRoot, absolutePath)
  const parsed = path.parse(relativePath)
  const segments = parsed.dir.split(path.sep).filter(Boolean)
  const categoryKey = (segments[0] || 'notes').toLowerCase()
  const category = categoryNames[categoryKey] || displayName(segments[0] || 'Notes')
  const outputSegments = [...segments.map(slugify), `${slugify(parsed.name)}.md`]
  const route = `/wiki/${outputSegments.join('/').replace(/\.md$/, '')}`

  return {
    absolutePath,
    relativePath,
    outputPath: path.join(contentRoot, ...outputSegments),
    title: displayName(parsed.name),
    category,
    route
  }
})

const noteAliases = new Map()
for (const note of notes) {
  const withoutExtension = note.relativePath.replace(/\.md$/i, '').replaceAll(path.sep, '/')
  noteAliases.set(withoutExtension.toLowerCase(), note)
  noteAliases.set(path.basename(withoutExtension).toLowerCase(), note)
  noteAliases.set(note.title.toLowerCase(), note)
}

await rm(contentRoot, { recursive: true, force: true })
await rm(assetRoot, { recursive: true, force: true })
await mkdir(contentRoot, { recursive: true })
await mkdir(assetRoot, { recursive: true })

const assetAliases = new Map()
for (const absolutePath of allFiles.filter(file => imageExtensions.has(path.extname(file).toLowerCase()))) {
  const relativePath = path.relative(sourceRoot, absolutePath)
  const parsed = path.parse(relativePath)
  const outputName = `${slugify(relativePath.slice(0, -parsed.ext.length))}${parsed.ext.toLowerCase()}`
  await cp(absolutePath, path.join(assetRoot, outputName))
  assetAliases.set(relativePath.replaceAll(path.sep, '/').toLowerCase(), outputName)
  if (!assetAliases.has(path.basename(relativePath).toLowerCase())) {
    assetAliases.set(path.basename(relativePath).toLowerCase(), outputName)
  }
}

function resolveAsset(target, note) {
  let decodedTarget
  try {
    decodedTarget = decodeURIComponent(target)
  } catch {
    decodedTarget = target
  }

  const relativeToNote = path
    .normalize(path.join(path.dirname(note.relativePath), decodedTarget))
    .replaceAll(path.sep, '/')
    .toLowerCase()
  const outputName = assetAliases.get(relativeToNote) || assetAliases.get(path.basename(decodedTarget).toLowerCase())
  return outputName ? `${siteBase}/wiki-assets/${encodeURIComponent(outputName)}` : null
}

function resolveNote(target) {
  const [rawPath, heading] = target.split('#', 2)
  const normalized = rawPath.replace(/\.md$/i, '').replaceAll('\\', '/').toLowerCase()
  const note = noteAliases.get(normalized) || noteAliases.get(path.basename(normalized))
  if (!note) return null
  return `${siteBase}${note.route}${heading ? `#${headingSlug(heading)}` : ''}`
}

function transformLine(line, note) {
  let transformed = line.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, target, label = '') => {
    const assetUrl = resolveAsset(target, note)
    return assetUrl ? `![${label}](${assetUrl})` : match
  })

  transformed = transformed.replace(/(?<!!)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, target, label) => {
    const noteUrl = resolveNote(target)
    return noteUrl ? `[${label || target.split('#')[0]}](${noteUrl})` : match
  })

  transformed = transformed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, target) => {
    const cleanTarget = target.trim().replace(/^<|>$/g, '')
    if (/^(?:https?:|data:|\/)/i.test(cleanTarget)) return match
    const assetUrl = resolveAsset(cleanTarget, note)
    return assetUrl ? `![${alt}](${assetUrl})` : match
  })

  transformed = transformed.replace(/(?<!!)\[([^\]]+)\]\(([^)]+\.md(?:#[^)]+)?)\)/gi, (match, label, target) => {
    const noteUrl = resolveNote(target)
    return noteUrl ? `[${label}](${noteUrl})` : match
  })

  return transformed
}

for (const note of notes) {
  const source = removeFrontmatter(await readFile(note.absolutePath, 'utf8'))
  let inFence = false
  const body = source.split('\n').map((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return line
    }
    return inFence ? line : transformLine(line, note)
  }).join('\n').trim()
  const date = getLastUpdated(note.relativePath)
  const frontmatter = [
    '---',
    `title: ${yamlString(note.title)}`,
    `description: ${yamlString(`从 Obsidian 同步的 ${note.category} 笔记。`)}`,
    ...(date ? [`date: ${date}`] : []),
    `category: ${yamlString(note.category)}`,
    `tags: [${yamlString(note.category)}]`,
    'type: wiki',
    'draft: false',
    '---',
    ''
  ].join('\n')

  await mkdir(path.dirname(note.outputPath), { recursive: true })
  await writeFile(note.outputPath, `${frontmatter}${body}\n`, 'utf8')
}

console.log(`Synced ${notes.length} Wiki notes and ${assetAliases.size} asset aliases from ${sourceRoot}`)
