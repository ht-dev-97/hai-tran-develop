export type SVGProps = React.SVGProps<SVGSVGElement>

type Messages = typeof import("../../messages/en.json")
type VNMssages = typeof import("../../messages/vn.json")

declare interface IntlMessages extends Messages, EsMssages {}
