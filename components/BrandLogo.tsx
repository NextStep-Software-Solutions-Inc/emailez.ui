export default function BrandLogo() {
  return (
    <span className="flex items-center space-x-2">
      <img src="/emailez-logo-01.png" alt="MailPilot Logo" width={36} height={36} className="rounded-lg" />
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent antialiased" style={{ fontFamily: 'Nunito, Comfortaa, sans-serif', fontWeight: 900 }}>
        EmailEZ
      </span>
    </span>
  );
}
