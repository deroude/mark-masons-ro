import { Component, OnInit } from '@angular/core';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils';
import docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export interface TemplateField {
  id: string;
  title: string;
  type: 'string'|'number'|'date'|'array';
  children?: TemplateField[];
}

@Component({
  selector: 'mark-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  fields: TemplateField[] = [
    {
      id: 'lodge_name',
      title: 'Lodge Name',
      type: 'string'
    },
    {
      id: 'lodge_no',
      title: 'Lodge Number',
      type: 'string'
    },
    {
      id: 'presiding_title',
      title: 'Presiding officer title',
      type: 'string'
    },
    {
      id: 'presiding_name',
      title: 'Presiding officer name',
      type: 'string'
    },
    {
      id: 'presiding_role',
      title: 'Presiding officer role',
      type: 'string'
    },
    {
      id: 'address',
      title: 'Address',
      type: 'string'
    },
    {
      id: 'date',
      title: 'Date',
      type: 'string'
    },
    {
      id: 'time',
      title: 'Time',
      type: 'string'
    },
    {
      id: 'f_officers',
      title: 'First Officers',
      type: 'array',
      children: [
        {
          id: 'prefix',
          title: 'Prefix',
          type: 'string'
        },
        {
          id: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          id: 'role',
          title: 'Role',
          type: 'string'
        }
      ]
    },
    {
      id: 'assisting_officers',
      title: 'Assisting Officers',
      type: 'array',
      children: [
        {
          id: 'prefix',
          title: 'Prefix',
          type: 'string'
        },
        {
          id: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          id: 'role',
          title: 'Role',
          type: 'string'
        }
      ]
    },
    {
      id: 'members',
      title: 'Members',
      type: 'array',
      children: [
        {
          id: 'prefix',
          title: 'Prefix',
          type: 'string'
        },
        {
          id: 'name',
          title: 'Name',
          type: 'string'
        }
      ]
    }
  ];

  src = 'MMM ORDER OF PROCEEDINGS TEMPLATE.docx';

  value: any = {
    lodge_name: 'A Great Lodge',
    lodge_no: '1988',
    presiding_title: 'RIGHT WORSHIPFUL BROTHER',
    presiding_name: 'JOHN DOW',
    presiding_role: 'DEPUTY GRAND MASTER',
    address: `The Blue Temple, on the Lake, Troy`,
    date: '3 March 2018',
    time: '11.00 a.m.',
    f_officers: [
      {
        name: 'Florin Sadoveanu',
        prefix: 'W.Bro',
        role: 'Master'
      },
      {
        name: 'Cristian Rebreanu',
        prefix: 'Bro',
        role: 'Senior Warden'
      }
    ],
    members: [
      {
        prefix: 'Bro',
        name: 'Marilen Gabriel Pirtea'
      },
      {
        prefix: 'Bro',
        name: 'Ovidiu Socrate'
      }
    ],
    assisting_officers: [
      {
        prefix: 'M.W.Bro',
        name: 'Richard Ironheart',
        role: 'Grand Senior Warden'
      },
      {
        prefix: 'R.W.Bro',
        name: 'John the Baptist',
        role: 'Grand Junior Warden'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {

  }

  addRow(field: string): void {
    if (!this.value[field]) {
      this.value[field] = [];
    }
    this.value[field].push({});
  }

  removeRow(field: string, index: number): void {
    this.value[field].splice(index, 1);
  }

  download(): void {
    PizZipUtils.getBinaryContent(`/assets/${this.src}`, (error, content) => {
      if (error) { throw error; }

      const zip = new PizZip(content);
      let doc;
      try {
        doc = new docxtemplater(zip);
      } catch (error) {
        console.error(error);
      }

      doc.setData(this.value);
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      }
      catch (error) {
        console.error(error);
      }

      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      }); // Output the document using Data-URI
      saveAs(out, this.src);
    });
  }

}
