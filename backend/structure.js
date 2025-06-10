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
      .title('Commercial')
      .icon(BasketIcon)
      .child(S.document().schemaType('selection').documentId('commercial')),
    S.listItem()
      .title('Interior')
      .icon(DashboardIcon)
      .child(S.document().schemaType('selection').documentId('interior')),
    S.divider(),
	orderableDocumentListDeskItem({type: 'project', title: 'Archive', icon: ProjectsIcon, S, context}),
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