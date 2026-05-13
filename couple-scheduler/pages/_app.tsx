import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../src/components/Layout";
import { MotionWrapper } from "../src/components/MotionWrapper";
import { useCursorTrail } from "../src/hooks/useCursorTrail";

export default function MyApp({ Component, pageProps }: AppProps) {
  useCursorTrail();
  return (
    <Layout>
      <MotionWrapper>
        <Component {...pageProps} />
      </MotionWrapper>
    </Layout>
  );
}
