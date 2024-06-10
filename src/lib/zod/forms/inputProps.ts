import {
  unstable_inputProps,
  type InputProps as InputProps_,
  type RenderProps as RenderProps_,
} from "react-zorm";

export function inputProps({
  id,
  issues,
  name,
  type,
  errorId,
  ...rest
}: RenderProps) {
  id ??= `${name}-input`;
  errorId ??= `${id}-error`;
  issues ??= [];

  return unstable_inputProps({
    id,
    issues,
    name,
    type,
    errorId,
    ...rest,
  }) as InputProps;
}

export type RenderProps = Omit<RenderProps_, "id" | "issues" | "errorId"> &
  Partial<RenderProps_>;

export interface InputProps extends InputProps_ {
  type: astroHTML.JSX.HTMLInputTypeAttribute;
}
