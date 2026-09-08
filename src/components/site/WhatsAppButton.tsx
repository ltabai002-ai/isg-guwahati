export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919435049200?text=Hello%20ISG%2C%20I%27d%20like%20to%20know%20more%20about%20admissions."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with International School Guwahati on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#128C7E] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.470 0 1.45 1.06 2.86 1.21 3.06.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 2C6.5 2 2 6.5 2 12.05c0 1.77.46 3.5 1.35 5.02L2 22l5.06-1.32a10 10 0 0 0 4.99 1.32h.01c5.54 0 10.04-4.5 10.04-10.05C22.1 6.5 17.6 2 12.05 2z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
