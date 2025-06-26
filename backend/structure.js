import { EarthGlobeIcon, InfoOutlineIcon, TagsIcon, ProjectsIcon, CogIcon, HomeIcon, DashboardIcon, BasketIcon, HighlightIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'


export const myStructure = (S, context) => {
  const entities = [
    S.divider(),
    S.listItem()
      .title('Homepage')
      .icon(HomeIcon)
      .child(S.document().schemaType('selection').documentId('homepage')),
    S.listItem()
      .title('Commercial page')
      .icon(BasketIcon)
      .child(S.document().schemaType('selectionCommercial').documentId('selectionCommercial')),
    S.listItem()
      .title('Interior page')
      .icon(DashboardIcon)
      .child(S.document().schemaType('selectionInterior').documentId('selectionInterior')),
    S.divider(),
	orderableDocumentListDeskItem({type: 'commercial', title: 'Commercials', icon: BasketIcon, S, context}),
	orderableDocumentListDeskItem({type: 'interior', title: 'Interiors', icon: DashboardIcon, S, context}),
	S.divider(),
    S.documentTypeListItem('client')
      .title('Clients'),
    S.documentTypeListItem('photographer')
      .title('Photographers'),
    S.divider(),
    S.listItem()
      .title('Info')
      .icon(InfoOutlineIcon)
      .child(S.document().schemaType('info').documentId('info')),
  ];
  const siteSettings = [
    S.divider(),
    S.listItem()
      .title('Settings')
      .icon(CogIcon)
      .child(S.document().schemaType('settings').documentId('settings')),
    S.listItem()
      .title('SEO')
      .icon(EarthGlobeIcon)
      .child(S.document().schemaType('seo').documentId('seo')),
    S.documentTypeListItem('policy')
      .title('Policies'),
  ];

  return S.list()
    .title('Content')
    .items([
      ...entities,
      ...siteSettings,
    ]);
};