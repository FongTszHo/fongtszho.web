---
title: "Claude Code Install"
description: "从 Obsidian 同步的 AI Agent 笔记。"
date: 2026-07-21
category: "AI Agent"
tags: ["AI Agent"]
type: wiki
draft: false
---
资料
> [菜鸟教程 - Claude Code 安装](https://www.runoob.com/claude-code/claude-code-install.html)
> [Claude Code 官方文档 - 快速开始](https://code.claude.com/docs/zh-CN/quickstart#native-install-recommended)
# 一、安装 claude
使用官方命令行安装
```bash
curl -fsSL https://claude.ai/install.sh | bash
```
安装完成后若使用fish,需要添加`PATH
```bash
# install path
ls ~/.local/bin
# add claude path to fish
fish_add_path ~/.local/bin
# update fish
source ~/.config/fish/config.fish
#check version
claude --version
#显示
2.1.150 (Claude Code)
```


# 安装CC switch
> [CC Switch 官网](https://ccswitch.io/zh/)

deepseek接入cc 
> [DeepSeek API 文档 - Claude Code 集成](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)
