import React, { useState } from 'react'

type FileSystemNode = {
  name: string
  type: 'file' | 'directory'
  content?: string
  children?: FileSystemNode[]
}

const initialFileSystem: FileSystemNode[] = [
  {
    name: 'root',
    type: 'directory',
    children: [],
  },
]

const Terminal = () => {
  const [fileSystem, setFileSystem] =
    useState<FileSystemNode[]>(initialFileSystem)
  const [currentPath, setCurrentPath] = useState<string>('root')
  const [history, setHistory] = useState<string[]>([])
  const [input, setInput] = useState<string>('')

  const executeCommand = (command: string) => {
    const [cmd, ...args] = command.split(' ')
    let output = ''

    switch (cmd) {
      case 'ls':
        output = listDirectory()
        break
      case 'mkdir':
        output = makeDirectory(args[0])
        break
      case 'touch':
        output = createFile(args[0])
        break
      case 'cd':
        output = changeDirectory(args[0])
        break
      default:
        output = `Command not found: ${cmd}`
    }

    setHistory((prev) => [...prev, `$ ${command}`, output])
  }

  const listDirectory = () => {
    const currentDir = navigateToCurrentDir()
    if (currentDir?.type === 'directory' && currentDir.children) {
      return (
        currentDir.children.map((child) => child.name).join('\n') ||
        'Empty directory'
      )
    }
    return 'Invalid directory'
  }

  const makeDirectory = (name: string) => {
    if (!name) return 'mkdir: missing directory name'

    const currentDir = navigateToCurrentDir()
    if (currentDir?.type === 'directory') {
      if (currentDir.children?.find((child) => child.name === name)) {
        return `mkdir: cannot create directory '${name}': File exists`
      }

      currentDir.children?.push({ name, type: 'directory', children: [] })
      setFileSystem([...fileSystem])
      return `Directory '${name}' created`
    }
    return 'Invalid directory'
  }

  const createFile = (name: string) => {
    if (!name) return 'touch: missing file name'

    const currentDir = navigateToCurrentDir()
    if (currentDir?.type === 'directory') {
      if (currentDir.children?.find((child) => child.name === name)) {
        return `touch: cannot create file '${name}': File exists`
      }

      currentDir.children?.push({ name, type: 'file', content: '' })
      setFileSystem([...fileSystem])
      return `File '${name}' created`
    }
    return 'Invalid directory'
  }

  const changeDirectory = (name: string) => {
    if (!name) return 'cd: missing directory name'

    if (name === '..') {
      const parts = currentPath.split('/')
      if (parts.length > 1) {
        parts.pop()
        setCurrentPath(parts.join('/'))
        return `Changed directory to ${parts.join('/')}`
      }
      return 'Already at root'
    }

    const currentDir = navigateToCurrentDir()
    const targetDir = currentDir?.children?.find(
      (child) => child.name === name && child.type === 'directory'
    )
    if (targetDir) {
      setCurrentPath(`${currentPath}/${name}`)
      return `Changed directory to ${currentPath}/${name}`
    }
    return `cd: no such directory: ${name}`
  }

  const navigateToCurrentDir = (): FileSystemNode | undefined => {
    const parts = currentPath.split('/')
    let currentDir: FileSystemNode | undefined = fileSystem[0]
    for (const part of parts) {
      if (!currentDir || currentDir.type !== 'directory') return undefined
      currentDir = currentDir.children?.find((child) => child.name === part)
    }
    return currentDir
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input)
      setInput('')
    }
  }

  return (
    <div className="terminal-container">
      <div className="terminal-output">
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            {line}
          </div>
        ))}
      </div>
      <div className="terminal-input">
        <span>{currentPath} $ </span>
        <input value={input} onChange={handleInput} onKeyDown={handleKeyDown} />
      </div>
    </div>
  )
}

export default Terminal
