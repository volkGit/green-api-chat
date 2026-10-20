export type ResponseMessage = {
  idMessage: string
}

export type ResponseDeleteNotification = {
  result: string
  reason: string
}

export type ReceiveNotification = {
  receiptId: number,
  body: {
      typeWebhook: string,
      instanceData: {
          idInstance: number,
          wid: string,
          typeInstance: string
      },
      timestamp: number,
      idMessage: string,
      senderData: {
          chatId: string,
          chatName: string,
          chatType: string,
          sender: string,
          senderName: string,
          senderType: string,
          senderContactName: string,
          senderPhoneNumber: number
      },
      messageData: {
          typeMessage: string,
          textMessageData: {
              textMessage: string
          },
          extendedTextMessageData: {
              text: string
          }
      }
  }
}