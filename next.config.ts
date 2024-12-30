import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: false
  }
};

export default withPayload(nextConfig) ;
