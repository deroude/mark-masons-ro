import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';

const codeRegex = /^([A-Z]{1})([A-Z]{1})([0-9]+)$/;
const vdof = 3;
const hdof = 3;
const xmin = 0;
const xmax = 800;
const ymin = 100;
const ymax = 500;

@Component({
  selector: 'mark-user-mark',
  templateUrl: './user-mark.component.html',
  styleUrls: ['./user-mark.component.scss']
})
export class UserMarkComponent implements OnInit {

  @Input() code: string;

  t1: string;
  t2: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor() { }

  ngOnInit(): void {
    const matcher = this.code.match(codeRegex);
    this.t1 = matcher[1];
    this.t2 = matcher[2];
    const vslice = (ymax - ymin) / vdof;
    const hslice = (xmax - xmin) / hdof / 2;
    const hmid1 = (xmax - xmin) / 4 + xmin;
    const hmid2 = (xmax - xmin) * 3 / 4 + xmin;
    const vmid = (ymax - ymin) / 2 + ymin;

    const num = Number(matcher[3]);
    const arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
    const view = new DataView(arr);
    view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false

    this.x1 = this.position(view.getInt8(0), hslice) + hmid1;
    this.y1 = this.position(view.getInt8(1), vslice) + vmid;
    this.x2 = this.position(view.getInt8(2), hslice) + hmid2;
    this.y2 = this.position(view.getInt8(3), vslice) + vmid;
  }

  position(code: number, slice: number): number {
    const sgn = code % 2 ? 1 : -1;
    return Math.ceil(code / 2) * slice * sgn;
  }

}
