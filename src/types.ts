export type MediaType = 'book' | 'album'
export type Collection = { id: string; name: string; description: string; createdAt: number; cover?: string; notes?: string; tags?: string[] }
export type LibraryItem = { id: string; sourceId: string; type: MediaType; title: string; creator: string; year: string; image: string; description: string; externalUrl: string; collectionId: string; tags: string[]; addedAt: number }
export type SearchItem = Omit<LibraryItem, 'id' | 'collectionId' | 'tags' | 'addedAt'>
export type LibraryData = { collections: Collection[]; items: LibraryItem[] }

declare global { interface Window { libraryAPI?: { read: () => Promise<LibraryData>; write: (data: LibraryData) => Promise<LibraryData>; openExternal: (url: string) => Promise<void> } } }
