import { AuthForm } from '../../components/auth-form';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

export default function InfluencerSignUp() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://source.unsplash.com/1600x900/?food,restaurant)',
      }}
    >
      <Header />
      <main className="container mx-auto py-16 px-4 relative z-10">
        <div className="max-w-md mx-auto bg-white bg-opacity-75 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">
            Sign Up as Influencer
          </h1>
          <AuthForm type="signup" role="influencer" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
