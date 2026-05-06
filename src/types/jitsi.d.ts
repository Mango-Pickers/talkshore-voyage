export {};

declare global {
  interface Window {
    JitsiMeetExternalAPI: new (
      domain: string,
      options: {
        roomName: string;
        width?: string | number;
        height?: string | number;
        parentNode?: HTMLElement | null;
        userInfo?: {
          displayName?: string;
        };
      }
    ) => {
      dispose: () => void;
    };
  }
}