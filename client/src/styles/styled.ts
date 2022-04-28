import {
	background,
	BackgroundColorProps,
	BackgroundProps,
	border,
	BorderProps,
	color,
	ColorProps,
	flexbox,
	FlexboxProps,
	fontFamily,
	grid,
	GridProps,
	layout,
	LayoutProps,
	position,
	PositionProps,
	shadow,
	ShadowProps,
	space,
	SpaceProps,
	typography,
	TypographyProps,
} from 'styled-system'

export {
	background,
	border,
	color,
	flexbox,
	fontFamily,
	grid,
	layout,
	position,
	shadow,
	space,
	typography,
}

export type DesignSystemProps = ColorProps &
  BackgroundProps &
  BackgroundColorProps &
  LayoutProps &
  BorderProps &
  FlexboxProps &
  GridProps &
  SpaceProps &
  TypographyProps &
  PositionProps &
  ShadowProps
