export interface TemplateField {
    id: string;
    title: string;
    type: 'string'|'number'|'date'|'array';
    children?: TemplateField[];
}
