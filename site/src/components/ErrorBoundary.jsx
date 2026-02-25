import { Component } from 'react'
import i18next from 'i18next'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log to console in development only — never expose stack traces to users
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      const t = i18next.t.bind(i18next)
      return (
        <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-cream">
          <span className="font-mono text-xs text-moss dark:text-moss-light tracking-widest uppercase">{t('errorBoundary.label')}</span>
          <h1 className="font-heading font-extrabold text-forest text-3xl md:text-4xl mt-4 tracking-tight">
            {t('errorBoundary.heading')}
          </h1>
          <p className="font-body text-warm-gray text-base mt-4 max-w-md leading-relaxed">
            {t('errorBoundary.message')}
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 bg-madagascar text-white font-heading font-semibold px-7 py-3.5 text-sm rounded-4xl"
          >
            {t('errorBoundary.backHome')}
          </a>
        </div>
      )
    }
    return this.props.children
  }
}
