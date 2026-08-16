import { cn } from '@moontotems/ui'

type CaptionValue = string | number | boolean | null | undefined

function captionText(value: CaptionValue) {
  return value == null || value === false ? '' : String(value)
}

/** Name + job lines (canvas tile styling). */
export function TotemCaption({
  name1,
  name2,
  jobField,
  jobTitle,
  className,
  nameClassName,
  jobClassName,
}: {
  name1?: CaptionValue
  name2?: CaptionValue
  jobField?: CaptionValue
  jobTitle?: CaptionValue
  className?: string
  nameClassName?: string
  jobClassName?: string
}) {
  return (
    <div className={cn('text-center leading-tight text-white', className)}>
      <div className={cn('mb-0.5 truncate text-base font-normal', nameClassName)}>
        {`${captionText(name1)} ${captionText(name2)}`}
      </div>
      <div className={cn('truncate text-[13px] leading-4 font-light', jobClassName)}>
        {captionText(jobField)} {captionText(jobTitle)}
      </div>
    </div>
  )
}
