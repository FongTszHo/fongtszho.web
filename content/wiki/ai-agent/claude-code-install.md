---
title: Claude Code 安装记录
description: 记录 Claude Code 在本地环境中的安装、配置和后续集成思路。
date: 2026-07-21
category: AI Agent
tags: [Claude Code, Tooling]
type: wiki
draft: false
---

# Claude Code 安装记录

## 安装 Claude

使用官方安装命令：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

安装完成后，如果使用 fish，需要把安装目录加入 PATH。

```bash
ls ~/.local/bin
fish_add_path ~/.local/bin
source ~/.config/fish/config.fish
claude --version
```

## 后续方向

- 整理常用命令
- 记录不同模型和代理服务的配置方式
- 沉淀 AI Agent 开发中的上下文管理经验
