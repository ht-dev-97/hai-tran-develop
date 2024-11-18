type Messages = typeof import('../../messages/en.json')
type VNMssages = typeof import('../../messages/vn.json')

declare interface IntlMessages extends Messages, EsMssages {}

declare module '*.css'
