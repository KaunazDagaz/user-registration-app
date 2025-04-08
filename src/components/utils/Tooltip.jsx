import { Provider, Root, Trigger, Content, Portal} from "@radix-ui/react-tooltip";

export default function Tooltip({ children, content }) {
  return (
    <Provider delayDuration={150}>
      <Root>
        <Trigger className="w-full">{children}</Trigger>
        <Portal>
          <Content align="start" alignOffset={77} side="bottom" sideOffset={21}>
            <p className="py-0.75 px-4 text-white bg-black rounded-sm">
              {content}
            </p>
          </Content>
        </Portal>
      </Root>
    </Provider>
  )
}