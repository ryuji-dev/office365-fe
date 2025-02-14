import * as Toast from '@radix-ui/react-toast';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: React.ElementType;
  message: string;
  isError?: boolean;
}

const ToastNotification: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  icon: Icon,
  message,
  isError = false,
}) => (
  <Toast.Root
    open={open}
    onOpenChange={onOpenChange}
    className={`bg-indigo-950 text-gray-50 rounded-lg shadow-lg px-8 py-4 my-2 mx-1 flex items-center gap-2 z-50`}
  >
    <Toast.Title className="flex-shrink-0">
      <Icon
        className={`w-6 h-6 ${isError ? 'text-rose-500' : 'text-green-500'}`}
      />
    </Toast.Title>
    <Toast.Description className="flex-grow mt-0.5">
      {message}
    </Toast.Description>
  </Toast.Root>
);

export default ToastNotification;
