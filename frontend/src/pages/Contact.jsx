import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactFAQ from "../components/contact/ContactFAQ";
import ContactCTA from "../components/contact/ContactCTA";


const Contact = () => {


  return (

    <main
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-gradient-to-b
      from-sky-50
      via-white
      to-cyan-50
      "
    >


      {/* Hero Section */}

      <ContactHero />



     



      {/* FAQ */}

      <ContactFAQ />



      {/* CTA */}

      <ContactCTA />


    </main>

  );

};


export default Contact;