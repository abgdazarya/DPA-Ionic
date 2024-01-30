import { Pipe, PipeTransform } from '@angular/core';

export enum StatusApprovalEnum {
  SUBMITTED = 'SUBMITTED',
  WAITING_APPROVAL = 'WAITING-APPROVAL',
  REJECT = 'REJECTED',
  APPROVED = 'APPROVED',
}

export namespace StatusApprovalEnum {
  export function getValues(): any[] {
    return [
      {
        id: StatusApprovalEnum.SUBMITTED,
        text: 'Submitted',
        chipColor: 'primary',
        bgColor: 'bg-lazuli-50',
        textColor: 'text-lazuli-500',
      },
      {
        id: StatusApprovalEnum.WAITING_APPROVAL,
        text: 'Waiting Approval',
        chipColor: 'warning',
        bgColor: 'bg-warning-50',
        textColor: 'text-warning-500',
      },
      {
        id: StatusApprovalEnum.REJECT,
        text: 'Reject',
        chipColor: 'danger',
        bgColor: 'bg-red-50',
        textColor: 'text-red-500',
      },
      {
        id: StatusApprovalEnum.APPROVED,
        text: 'Approve',
        chipColor: 'success',
        bgColor: 'bg-success-200',
        textColor: 'text-success-500',
      },
    ];
  }

  export function find(id: StatusApprovalEnum): any | undefined {
    StatusApprovalEnum.getValues().find((item) => {
      return item.id === id;
    });

    return StatusApprovalEnum.getValues().find((item) => item.id === id);
  }
}

@Pipe({
  name: 'statusApprovalEnum',
})
export class StatusApprovalEnumPipe implements PipeTransform {
  public transform(id: any, key: string): any {
    const val: any = StatusApprovalEnum.find(id);
    return val[key] || null;
  }
}
