interface AppBarProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function AppBar({ title, description, children }: AppBarProps) {
    return (
        <div className='my-5 w-full flex flex-row items-start justify-between'>
            <div className="flex flex-row gap-2 flex-col">
                <h1 className='text-3xl font-bold'>{title}</h1>
                <p className='text-md italic text-light-200'>{description}</p>
            </div>
            {children}
        </div>
    )
}
