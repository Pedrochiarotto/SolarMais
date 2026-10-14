import { defineType, defineField } from 'sanity';
import pageFields from './page-fields.json';
import defaults from '../src/content/defaults.json';
const text = (name: string, title: string, required = false) => defineField({ name, title, type: 'string', validation: rule => required ? rule.required() : rule });
const image = (name: string, title: string) => defineField({name, title, type: 'image'});
const page = (name: 'home' | 'portfolio', title: string) => defineField({
  name, title, type: 'object', group: name,
  fields: pageFields[name].map(section => defineField({ name: section.name, title: section.title, type: 'object',
    options: {collapsible: true}, fields: section.fields.map(field => defineField({...field, validation: rule => rule.required()})),
  })),
});
export const schemaTypes = [
  defineType({ name: 'siteSettings', title: 'Configurações e páginas', type: 'document',
    groups: [{name:'general',title:'Identidade e contato',default:true},{name:'home',title:'Página inicial'},{name:'portfolio',title:'Galeria'},{name:'faqs',title:'Dúvidas frequentes'}],
    initialValue: { ...defaults, logo: undefined, heroImage: undefined },
    fields: [
      ...[text('siteTitle','Título da página inicial',true),text('portfolioTitle','Título da galeria',true),
      defineField({name:'description',title:'Descrição para buscadores',type:'text',rows:3}),
      text('footerText','Texto do rodapé'),image('logo','Logo'),image('heroImage','Imagem principal e chamada do portfólio'),
      text('phone','Telefone'),text('email','E-mail'),
      defineField({name:'whatsapp',title:'WhatsApp com país e DDD',description:'Exemplo: 5511999999999',type:'string',validation:rule=>rule.regex(/^\d{10,15}$/)}),
      defineField({name:'instagram',title:'Instagram',type:'url',validation:rule=>rule.uri({scheme:['https']})}),
      ].map(field => ({...field,group:'general'})),
      page('home','Página inicial'), page('portfolio','Página de projetos'),
      defineField({ name:'faqs',title:'Perguntas e respostas',type:'array',group:'faqs',of:[{type:'object',name:'faq',fields:[
        text('question','Pergunta',true),defineField({name:'answer',title:'Resposta',type:'text',validation:rule=>rule.required()}),
      ],preview:{select:{title:'question'}}}] }),
    ],preview:{prepare:()=>({title:'SolarMais — Configurações e páginas'})},
  }),
  defineType({name:'project',title:'Projeto',type:'document',initialValue:{simulated:false,order:0},fields:[
    text('title','Nome do projeto',true),
    defineField({name:'slug',title:'Identificador do projeto',description:'Após publicar, preserve este identificador para manter os links existentes.',type:'slug',options:{source:'title',maxLength:96},validation:rule=>rule.required()}),
    defineField({name:'category',title:'Categoria',type:'string',options:{list:['Residencial','Comercial','Industrial']},validation:rule=>rule.required()}),
    text('city','Cidade / UF',true),
    defineField({name:'description',title:'Descrição',type:'text',validation:rule=>rule.required()}),
    text('power','Potência instalada'),text('completed','Conclusão'),text('modules','Quantidade de módulos'),
    defineField({name:'simulated',title:'Projeto demonstrativo / simulação',type:'boolean',description:'Ative para identificar imagens e informações que não representam uma obra real.'}),
    defineField({name:'order',title:'Ordem na galeria',type:'number',validation:rule=>rule.integer()}),
    defineField({name:'photos',title:'Fotografias',type:'array',of:[{type:'image',fields:[text('alt','Descrição acessível',true),text('caption','Legenda')]}],validation:rule=>rule.required().min(1)}),
  ],preview:{select:{title:'title',subtitle:'city',media:'photos.0'}}}),
];
