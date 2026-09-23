import {Button, Link} from "@heroui/react";

export default function AMButton({ color='default', shade=900, href, onClick, children, className, ...props }) {
    const light = shade > 500 ? 50 : 950;

    if (href) {
        return <Button
            color={color} variant={'ghost'} as={Link} href={href} {...props}
            className={
                `w-max border-${color}-${shade} text-${color}-${shade} ${className || ''}` +
                `data-[hover=true]:!text-${color}-${light} data-[hover=true]:!bg-${color}-${shade}`
            }
        >{children}</Button>
    }

    return <Button
        color={color} variant={'ghost'} onClick={onClick} {...props}
        className={
            `w-max border-${color}-${shade} text-${color}-${shade} ${className || ''}` +
            `data-[hover=true]:!text-${color}-${light} data-[hover=true]:!bg-${color}-${shade}`
        }
    >{children}</Button>
}