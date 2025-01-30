import { CollectionConfig } from 'payload';

const Accommodation: CollectionConfig = {
  slug: 'accommodations',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text'
        }
      ]
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'totalUnitsAvailable',
      type: 'number',
      required: true,
    }
  ],
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'id',
      'name', 
      'description', 
      'price', 
      'totalUnitsAvailable'
    ],
  
  }
};

export default Accommodation;