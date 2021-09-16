import '../styles/globals.css'


import App from 'next/app';
import {AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/dist/styles.css';

export default class WrappedApp extends App 
{
    constructor(props)
    {
        super(props);
        this.state = {workaround: false};
    }

    componentDidMount() {
        // This happens in browser - therefore we are ready to use `window`
        this.setState({ workaround: true });
      }

    render() {
        // Workaround to disable SSR
        if (!this.state.workaround) {
            return (<></>);
        }

        const {Component, pageProps} = this.props;

        return (
            <AppProvider i18n={enTranslations}>
                <Component {...pageProps}/>
            </AppProvider>
        );
    }
}