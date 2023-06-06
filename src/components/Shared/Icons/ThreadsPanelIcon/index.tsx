import { ThreadsPanelIconRoot } from '@components/Shared/Icons/Buttons/IconButtonWrapper/elements';
import { IconProps } from '../icon.types';

export const ThreadsPanelIcon = ({ onClick, size, customSize, color }: IconProps) => (
  <ThreadsPanelIconRoot
    size={size ?? 'regular'}
    aria-label="Threads Panel Button"
    onClick={onClick}
    css={customSize ? { width: customSize, height: customSize } : {}}
    className="threads-panel_icon"
    viewBox="0 0 24 24"
    color={color || 'light'}
  >
    <g strokeWidth="0" />

    <g strokeLinecap="round" strokeLinejoin="round" />

    <g>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill="#212121" fillRule="nonzero">
          <path d="M19.25,3.9982 C20.7688,3.9982 22,5.22942 22,6.7482 L22,17.2519 C22,18.7707 20.7688,20.0019 19.25,20.0019 L4.75,20.0019 C3.23122,20.0019 2,18.7707 2,17.2519 L2,6.74819 C2,5.22941 3.23122,3.9982 4.75,3.9982 L19.25,3.9982 Z M8.004,5.4972 L4.75,5.4982 C4.05965,5.4982 3.5,6.05784 3.5,6.74819 L3.5,17.2519 C3.5,17.9422 4.05964,18.5019 4.75,18.5019 L8.004,18.5012 L8.004,5.4972 Z M19.25,5.4982 L9.504,5.4972 L9.504,18.5012 L19.25,18.5019 C19.9404,18.5019 20.5,17.9422 20.5,17.2519 L20.5,6.7482 C20.5,6.05784 19.9404,5.4982 19.25,5.4982 Z M14.3564,9.14904 C14.5516,9.3443 14.5516,9.66088 14.3564,9.85614 L12.71,11.5012 L17.4951,11.5 C17.7712,11.4999 17.9952,11.7237 17.9953001,11.9998 C17.9954,12.276 17.7716,12.4999 17.4955,12.5 L12.71,12.5012 L14.3564,14.1476 C14.5516,14.3428 14.5516,14.6594 14.3564,14.8547 C14.1611,15.0499 13.8445,15.0499 13.6492,14.8547 L11.15,12.3554 C10.9547,12.1601 10.9547,11.8436 11.15,11.6483 L13.6492,9.14904 C13.8445,8.95378 14.1611,8.95378 14.3564,9.14904 Z" />
        </g>
      </g>
    </g>
  </ThreadsPanelIconRoot>
);
