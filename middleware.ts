export { default } from 'next-auth/middleware'

// Secures the matching routes...
// 可直接偵測 當登出時直接轉跳制登入頁面 防止停留於當前頁面
export const config = { matcher: ['/'] }
