import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import Accommodation from '@/app/(payload)/collections/Accomodations';
import { Media } from '@/app/(payload)/collections/Media';
import Booking from '@/app/(payload)/collections/Bookings';

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  admin : {
    components: {
      views: {
        dashboard: {
          Component: '@/app/(payload)/components/Dashboard'},
      }
    }
  },
  // Define and configure your collections in this array
  collections: [
    Media,
    Accommodation,
    Booking,
  ],
  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
//   secret:  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
        connectionString: process.env.DATABASE_URI,
        // connectionString:process.env.NEXT_PUBLIC_SUPABASE_URL!, 
      },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})