import {IPostTicketData, IVipTicket, TicketType} from "../../models/ticket/ticket";
import {initTicketElementTemplate} from "../../templates/ticketInfo";
import {postTicketData} from "@rest/tickets";


let ticketPostInstance: undefined | IPostTicketData;


export function initTicketInfo(ticket: undefined | TicketType | IVipTicket): void {
    const targetElement: null | Element = document.querySelector('.ticket-info');

    const ticketDescription: undefined | string = ticket?.description;
    const ticketOperator: string = ticket?.tourOperator;
    let vipClientType: undefined | string;
    if ("vipStatus" in ticket) {
        vipClientType = ticket.vipStatus;
    }


    const ticketElemsArr: [string, string, string] = [ticketDescription, ticketOperator, vipClientType];
    let ticketElemTemplate: string = '';

    ticketElemsArr.forEach((el: string, i: number): void => {
        ticketElemTemplate += initTicketElementTemplate(el, i);
    });

    targetElement.innerHTML = ticketElemTemplate;

}

export function initUserData(): Record<string, string> {
    const userInfo: NodeListOf<HTMLElement> = document.querySelectorAll('.user-info > p');
    let userInfoObj: Record<string, string> = {};
    userInfo.forEach((el) => {
        const inputDataName: string = el.getAttribute('data-name');
        if (inputDataName) {
            const inputElems: HTMLInputElement = el.querySelector('input');
            userInfoObj[inputDataName] = inputElems.value;
        }
    });

    console.log('userInfoObj',userInfoObj)
    return userInfoObj;
}

export function initPostData(data: IPostTicketData): void {
    initUserData();
    postTicketData(data).then((response: {success: boolean}) => {
        if (response.success) {
            console.log(response)
        }
    })
}

export function registerConfirmButton(): void {
    const targetEl: null | HTMLElement = document.getElementById('accept-order-button');
    if (targetEl) {
        targetEl.addEventListener('click', () => {
            initPostData(ticketPostInstance);
        });
    }
}


