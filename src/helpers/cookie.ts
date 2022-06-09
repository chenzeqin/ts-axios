const cookie = {
  read(name: string): string | null {
    // 正则提取cookie值
    const reg = new RegExp(`(^|;\\s*)(${name})=([^;]*)`)
    const match = document.cookie.match(reg)

    return match ? match[3] : null
  }
}

export default cookie
