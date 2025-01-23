import {getTicketById} from "@rest/tickets";
import '@myCss';
import '@assets/styles/tickets.scss'
import {IVipTicket, TicketType} from "../../models/ticket/ticket";
import {initFooterTitle, initHeaderTitle} from "@services/general/general";
import {initTicketInfo, registerConfirmButton} from "@services/tickets/ticket";

let ticketInstance: undefined | TicketType | IVipTicket;

// init main  data
initApp();
registerConfirmButton();



function initApp(): void {
    const ticketData: Promise<IVipTicket[]> = getTicketById<IVipTicket>('someId');
    ticketData.then((data: IVipTicket[]): void => {
        ticketInstance = data[0];
        const ticketName: string = typeof ticketInstance?.name === "string" ? ticketInstance?.name : '';
        initHeaderTitle(ticketName, 'h3');
        initFooterTitle('Туры по всему миру', 'h2');
        initTicketInfo(ticketInstance);
    });
}

/*  
- перенести все методы ниже в раздел services (сюда импортировать и вызывать)
- Указать в методах возвращающие типы, в теле функции также указать типы чтобы не было ошибок
*/
