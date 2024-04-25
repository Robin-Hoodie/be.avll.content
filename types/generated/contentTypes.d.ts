import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBecomingAMemberPageBecomingAMemberPage
  extends Schema.SingleType {
  collectionName: 'becoming_a_member_pages';
  info: {
    singularName: 'becoming-a-member-page';
    pluralName: 'becoming-a-member-pages';
    displayName: 'Becoming A Member Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::becoming-a-member-page.becoming-a-member-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::becoming-a-member-page.becoming-a-member-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogArticleBlogArticle extends Schema.CollectionType {
  collectionName: 'blog_articles';
  info: {
    singularName: 'blog-article';
    pluralName: 'blog-articles';
    displayName: 'Blog Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    coverPhoto: Attribute.Media;
    location: Attribute.String;
    links: Attribute.Relation<
      'api::blog-article.blog-article',
      'oneToMany',
      'api::blog-article-link.blog-article-link'
    >;
    date: Attribute.Date & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-article.blog-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-article.blog-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogArticleLinkBlogArticleLink
  extends Schema.CollectionType {
  collectionName: 'blog_article_links';
  info: {
    singularName: 'blog-article-link';
    pluralName: 'blog-article-links';
    displayName: 'Blog Article Link';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-article-link.blog-article-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-article-link.blog-article-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCompetitionClothingPageCompetitionClothingPage
  extends Schema.SingleType {
  collectionName: 'competition_clothing_pages';
  info: {
    singularName: 'competition-clothing-page';
    pluralName: 'competition-clothing-pages';
    displayName: 'Competition Clothing Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::competition-clothing-page.competition-clothing-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::competition-clothing-page.competition-clothing-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConfidantPageConfidantPage extends Schema.SingleType {
  collectionName: 'confidant_pages';
  info: {
    singularName: 'confidant-page';
    pluralName: 'confidant-pages';
    displayName: 'Confidant Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.RichText & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::confidant-page.confidant-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::confidant-page.confidant-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactPageContactPage extends Schema.SingleType {
  collectionName: 'contact_pages';
  info: {
    singularName: 'contact-page';
    pluralName: 'contact-pages';
    displayName: 'Contact Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-page.contact-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-page.contact-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContestContest extends Schema.CollectionType {
  collectionName: 'contests';
  info: {
    singularName: 'contest';
    pluralName: 'contests';
    displayName: 'Contest';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    date: Attribute.Date & Attribute.Required;
    scheduleLink: Attribute.String;
    websiteLink: Attribute.String;
    registrationLink: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contest.contest',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contest.contest',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContestRegistrationInstructionsPageContestRegistrationInstructionsPage
  extends Schema.SingleType {
  collectionName: 'contest_registration_instructions_pages';
  info: {
    singularName: 'contest-registration-instructions-page';
    pluralName: 'contest-registration-instructions-pages';
    displayName: 'Contest Registration Instructions Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contest-registration-instructions-page.contest-registration-instructions-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contest-registration-instructions-page.contest-registration-instructions-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFileLinkFileLink extends Schema.CollectionType {
  collectionName: 'file_links';
  info: {
    singularName: 'file-link';
    pluralName: 'file-links';
    displayName: 'File Link';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.String & Attribute.Required;
    file: Attribute.Media & Attribute.Required;
    type: Attribute.Enumeration<
      [
        'youthPlan',
        'visionAndOperation',
        'privacyStatement',
        'record',
        'calendar'
      ]
    > &
      Attribute.Required;
    sortPriority: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::file-link.file-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::file-link.file-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGTeamPageGTeamPage extends Schema.SingleType {
  collectionName: 'g_team_pages';
  info: {
    singularName: 'g-team-page';
    pluralName: 'g-team-pages';
    displayName: 'G Team Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::g-team-page.g-team-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::g-team-page.g-team-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMultimediaLinkMultimediaLink extends Schema.CollectionType {
  collectionName: 'multimedia_links';
  info: {
    singularName: 'multimedia-link';
    pluralName: 'multimedia-links';
    displayName: 'Multimedia Link';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::multimedia-link.multimedia-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::multimedia-link.multimedia-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNatureRunNatureRun extends Schema.CollectionType {
  collectionName: 'nature_runs';
  info: {
    singularName: 'nature-run';
    pluralName: 'nature-runs';
    displayName: 'Nature Run';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    memberDiscount: Attribute.Decimal &
      Attribute.Required &
      Attribute.DefaultTo<2>;
    tShirtPrice: Attribute.Decimal & Attribute.DefaultTo<17>;
    registrationStartDate: Attribute.Date &
      Attribute.Required &
      Attribute.Unique;
    registrationEndDate: Attribute.Date & Attribute.Required & Attribute.Unique;
    date: Attribute.Date & Attribute.Required & Attribute.Unique;
    natureRunRegistrations: Attribute.Relation<
      'api::nature-run.nature-run',
      'oneToMany',
      'api::nature-run-registration.nature-run-registration'
    >;
    isPK: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    title: Attribute.String & Attribute.Required;
    emailContent: Attribute.RichText & Attribute.Required;
    emailSubject: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Bevestiging inschrijving {{natureRunRegistration.distance}} op {{natureRun.date}}'>;
    distances: Attribute.Relation<
      'api::nature-run.nature-run',
      'oneToMany',
      'api::nature-run-distance.nature-run-distance'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::nature-run.nature-run',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::nature-run.nature-run',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNatureRunDistanceNatureRunDistance
  extends Schema.CollectionType {
  collectionName: 'nature_run_distances';
  info: {
    singularName: 'nature-run-distance';
    pluralName: 'nature-run-distances';
    displayName: 'Nature Run Distance';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    basePrice: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::nature-run-distance.nature-run-distance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::nature-run-distance.nature-run-distance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNatureRunRegistrationNatureRunRegistration
  extends Schema.CollectionType {
  collectionName: 'nature_run_registrations';
  info: {
    singularName: 'nature-run-registration';
    pluralName: 'nature-run-registrations';
    displayName: 'Nature Run Registration';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstName: Attribute.String & Attribute.Required;
    lastName: Attribute.String & Attribute.Required;
    email: Attribute.String & Attribute.Required;
    street: Attribute.String & Attribute.Required;
    bus: Attribute.String;
    zipCode: Attribute.String & Attribute.Required;
    gender: Attribute.Enumeration<['male', 'female', 'unidentified']> &
      Attribute.Required;
    birthYear: Attribute.Integer & Attribute.Required;
    emergencyPhoneNumber: Attribute.String & Attribute.Required;
    comment: Attribute.Text;
    tShirtSize: Attribute.Enumeration<
      ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    >;
    isMember: Attribute.Boolean & Attribute.Required;
    agreeToPrivacyTerms: Attribute.Boolean & Attribute.Required;
    place: Attribute.String & Attribute.Required;
    withTShirt: Attribute.Boolean & Attribute.Required;
    isPaid: Attribute.Boolean & Attribute.Required;
    natureRun: Attribute.Relation<
      'api::nature-run-registration.nature-run-registration',
      'manyToOne',
      'api::nature-run.nature-run'
    >;
    runsWithPK: Attribute.Boolean & Attribute.DefaultTo<false>;
    clubName: Attribute.String;
    bibNumber: Attribute.String;
    mollieId: Attribute.String;
    distance: Attribute.Relation<
      'api::nature-run-registration.nature-run-registration',
      'oneToOne',
      'api::nature-run-distance.nature-run-distance'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::nature-run-registration.nature-run-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::nature-run-registration.nature-run-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPerformanceFeePagePerformanceFeePage
  extends Schema.SingleType {
  collectionName: 'performance_fee_pages';
  info: {
    singularName: 'performance-fee-page';
    pluralName: 'performance-fee-pages';
    displayName: 'Performance Fee Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::performance-fee-page.performance-fee-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::performance-fee-page.performance-fee-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPersonPerson extends Schema.CollectionType {
  collectionName: 'people';
  info: {
    singularName: 'person';
    pluralName: 'people';
    displayName: 'Person';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    roles: Attribute.Relation<
      'api::person.person',
      'manyToMany',
      'api::person-role.person-role'
    >;
    phoneMobile: Attribute.String;
    phoneLandLine: Attribute.String;
    email: Attribute.Email;
    addressStreet: Attribute.String;
    addressZip: Attribute.String;
    addressPlace: Attribute.String;
    profilePhoto: Attribute.Media;
    titleAsManagement: Attribute.String;
    titleAsPartyManagement: Attribute.String;
    titleAsConfidant: Attribute.String;
    titleAsTrainerYouth: Attribute.String;
    titleAsTrainerFromCadet: Attribute.String;
    titleAsTrainerGTeam: Attribute.String;
    titleAsTrainerJoggers: Attribute.String;
    isProminentForManagement: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    isProminentForPartyManagement: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    isProminentForConfidant: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    isProminentForTrainerYouth: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    isProminentForTrainerFromCadet: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    isProminentForTrainerGTeam: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    isProminentForTrainerJoggers: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::person.person',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::person.person',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPersonRolePersonRole extends Schema.CollectionType {
  collectionName: 'person_roles';
  info: {
    singularName: 'person-role';
    pluralName: 'person-roles';
    displayName: 'Person Role';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'management',
        'partyManagement',
        'official',
        'confidant',
        'trainerYouth',
        'trainerFromCadet',
        'trainerGTeam',
        'trainerJoggers'
      ]
    > &
      Attribute.Required;
    people: Attribute.Relation<
      'api::person-role.person-role',
      'manyToMany',
      'api::person.person'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::person-role.person-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::person-role.person-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRecreationalClothingPageRecreationalClothingPage
  extends Schema.SingleType {
  collectionName: 'recreational_clothing_pages';
  info: {
    singularName: 'recreational-clothing-page';
    pluralName: 'recreational-clothing-pages';
    displayName: 'Recreational Clothing Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::recreational-clothing-page.recreational-clothing-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::recreational-clothing-page.recreational-clothing-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRegistrationContestRegistrationContest
  extends Schema.CollectionType {
  collectionName: 'registration_contests';
  info: {
    singularName: 'registration-contest';
    pluralName: 'registration-contests';
    displayName: 'Registration Contest';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    dateStart: Attribute.Date & Attribute.Required;
    dateEnd: Attribute.Date;
    location: Attribute.String & Attribute.Required;
    dateFinalRegistration: Attribute.Date & Attribute.Required;
    infoLink: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::registration-contest.registration-contest',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::registration-contest.registration-contest',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRegistrationPageRegistrationPage extends Schema.SingleType {
  collectionName: 'registration_pages';
  info: {
    singularName: 'registration-page';
    pluralName: 'registration-pages';
    displayName: 'Registration Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    registrationSubmittedMessage: Attribute.String & Attribute.Required;
    registrationSubmittedCloseButtonText: Attribute.String & Attribute.Required;
    introText: Attribute.RichText & Attribute.Required;
    privacyStatement: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::registration-page.registration-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::registration-page.registration-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResultResult extends Schema.CollectionType {
  collectionName: 'results';
  info: {
    singularName: 'result';
    pluralName: 'results';
    displayName: 'Result';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    date: Attribute.Date & Attribute.Required;
    link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::result.result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::result.result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSponsorSponsor extends Schema.CollectionType {
  collectionName: 'sponsors';
  info: {
    singularName: 'sponsor';
    pluralName: 'sponsors';
    displayName: 'Sponsor';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    link: Attribute.String & Attribute.Required;
    picture: Attribute.Media & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    addressStreet: Attribute.String;
    addressZip: Attribute.String;
    addressPlace: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sponsor.sponsor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sponsor.sponsor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSportingAccidentPageSportingAccidentPage
  extends Schema.SingleType {
  collectionName: 'sporting_accident_pages';
  info: {
    singularName: 'sporting-accident-page';
    pluralName: 'sporting-accident-pages';
    displayName: 'Sporting Accident Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sporting-accident-page.sporting-accident-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sporting-accident-page.sporting-accident-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTrainingTraining extends Schema.CollectionType {
  collectionName: 'trainings';
  info: {
    singularName: 'training';
    pluralName: 'trainings';
    displayName: 'Training';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    day: Attribute.Enumeration<
      [
        'Maandag',
        'Dinsdag',
        'Woensdag',
        'Donderdag',
        'Vrijdag',
        'Zaterdag',
        'Zondag'
      ]
    > &
      Attribute.Required;
    startTime: Attribute.Time & Attribute.Required;
    endTime: Attribute.Time & Attribute.Required;
    place: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Atletiekpiste \u2018Netestadion\u2019'>;
    comment: Attribute.String;
    type: Attribute.Enumeration<['youth', 'fromCadet', 'gTeam', 'joggers']> &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::training.training',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::training.training',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTrainingPageTrainingPage extends Schema.SingleType {
  collectionName: 'training_pages';
  info: {
    singularName: 'training-page';
    pluralName: 'training-pages';
    displayName: 'Training Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    introYouth: Attribute.RichText & Attribute.Required;
    introFromCadet: Attribute.RichText & Attribute.Required;
    introGTeam: Attribute.RichText & Attribute.Required;
    introJoggers: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::training-page.training-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::training-page.training-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUpcomingContestUpcomingContest
  extends Schema.CollectionType {
  collectionName: 'upcoming_contests';
  info: {
    singularName: 'upcoming-contest';
    pluralName: 'upcoming-contests';
    displayName: 'Upcoming Contest';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    primaryLink: Attribute.String & Attribute.Required;
    primaryLinkText: Attribute.String & Attribute.Required;
    date: Attribute.Date & Attribute.Required;
    location: Attribute.String & Attribute.Required;
    dateFinalRegistration: Attribute.Date;
    registrationByClub: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    secondaryLink: Attribute.String;
    secondaryLinkText: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::upcoming-contest.upcoming-contest',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::upcoming-contest.upcoming-contest',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWelcomePageWelcomePage extends Schema.SingleType {
  collectionName: 'welcome_pages';
  info: {
    singularName: 'welcome-page';
    pluralName: 'welcome-pages';
    displayName: 'Welcome Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::welcome-page.welcome-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::welcome-page.welcome-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiYouthWorkPageYouthWorkPage extends Schema.SingleType {
  collectionName: 'youth_work_pages';
  info: {
    singularName: 'youth-work-page';
    pluralName: 'youth-work-pages';
    displayName: 'Youth Work Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::youth-work-page.youth-work-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::youth-work-page.youth-work-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::becoming-a-member-page.becoming-a-member-page': ApiBecomingAMemberPageBecomingAMemberPage;
      'api::blog-article.blog-article': ApiBlogArticleBlogArticle;
      'api::blog-article-link.blog-article-link': ApiBlogArticleLinkBlogArticleLink;
      'api::competition-clothing-page.competition-clothing-page': ApiCompetitionClothingPageCompetitionClothingPage;
      'api::confidant-page.confidant-page': ApiConfidantPageConfidantPage;
      'api::contact-page.contact-page': ApiContactPageContactPage;
      'api::contest.contest': ApiContestContest;
      'api::contest-registration-instructions-page.contest-registration-instructions-page': ApiContestRegistrationInstructionsPageContestRegistrationInstructionsPage;
      'api::file-link.file-link': ApiFileLinkFileLink;
      'api::g-team-page.g-team-page': ApiGTeamPageGTeamPage;
      'api::multimedia-link.multimedia-link': ApiMultimediaLinkMultimediaLink;
      'api::nature-run.nature-run': ApiNatureRunNatureRun;
      'api::nature-run-distance.nature-run-distance': ApiNatureRunDistanceNatureRunDistance;
      'api::nature-run-registration.nature-run-registration': ApiNatureRunRegistrationNatureRunRegistration;
      'api::performance-fee-page.performance-fee-page': ApiPerformanceFeePagePerformanceFeePage;
      'api::person.person': ApiPersonPerson;
      'api::person-role.person-role': ApiPersonRolePersonRole;
      'api::recreational-clothing-page.recreational-clothing-page': ApiRecreationalClothingPageRecreationalClothingPage;
      'api::registration-contest.registration-contest': ApiRegistrationContestRegistrationContest;
      'api::registration-page.registration-page': ApiRegistrationPageRegistrationPage;
      'api::result.result': ApiResultResult;
      'api::sponsor.sponsor': ApiSponsorSponsor;
      'api::sporting-accident-page.sporting-accident-page': ApiSportingAccidentPageSportingAccidentPage;
      'api::training.training': ApiTrainingTraining;
      'api::training-page.training-page': ApiTrainingPageTrainingPage;
      'api::upcoming-contest.upcoming-contest': ApiUpcomingContestUpcomingContest;
      'api::welcome-page.welcome-page': ApiWelcomePageWelcomePage;
      'api::youth-work-page.youth-work-page': ApiYouthWorkPageYouthWorkPage;
    }
  }
}
