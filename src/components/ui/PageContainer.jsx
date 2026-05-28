import { cn } from '../../lib/cn'

const widths = {
  full: 'max-w-container-max',
  narrow: 'max-w-3xl',
  medium: 'max-w-4xl',
  wide: 'max-w-5xl',
}

const PageContainer = ({
  children,
  className,
  as: Comp = 'div',
  size = 'full',
  noPadding = false,
}) => (
  <Comp
    className={cn(
      'mx-auto w-full min-w-0',
      !noPadding && 'px-margin-mobile md:px-margin-desktop',
      widths[size] ?? widths.full,
      className
    )}
  >
    {children}
  </Comp>
)

export default PageContainer
