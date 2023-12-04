type ServerMessageData = {
  message: string;
  messageType: string;
};

export const dbErrorHandeling = (messageData: any, message: any) => {
  console.log(messageData);
  console.log(message);
};
