export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  meta_keywords?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  order: number;
  parent_id?: string;
  children?: MenuItem[];
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  created_at: string;
}

export interface Section {
  id: string;
  page_id: string;
  type: 'text' | 'image' | 'gallery' | 'video' | 'contact-form';
  content: any;
  order: number;
}

export interface CMSPermissions {
  pages: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  media: {
    upload: boolean;
    manage: boolean;
  };
  menu: {
    manage: boolean;
  };
  users: {
    manage: boolean;
  };
}