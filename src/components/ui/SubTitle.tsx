type SubTitleProps = {
    title: string;
    description?: string;
}

export const SubTitle = ({title, description} : SubTitleProps) => {
  return (
    <div className="flex flex-col justify-center ">
        <h3 className="text-title-18-b text-C-Black">{title}</h3>
        {description && <p className="text-body-14-r text-C-Gray-A">{description}</p>}
    </div>
  )
}