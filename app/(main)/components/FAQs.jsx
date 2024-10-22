import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqsDemo = [
    {
      question: "How many playlists can I add in Queue Tube?",
      answer:
        "You can add up to 20 playlists to Queue Tube. Simply use the playlist ID or link to add them. You can also mark up to 5 of those playlists as favorites for quick access.",
    },
    {
      question: "Can I take notes while watching videos?",
      answer:
        "Yes! Queue Tube allows you to take notes with timestamps while watching a video. This feature makes it easy to track important moments in the video for future reference.",
    },
    {
      question: "Can I share playlists or individual videos?",
      answer:
        "Absolutely! All playlists and videos added to Queue Tube are shareable. You can easily share them with others directly from the app.",
    },
    {
      question: "Can I watch videos without external suggestions or ads?",
      answer:
        "Yes, Queue Tube only shows the videos from your added playlists. You won’t get any external video suggestions or ads, ensuring a distraction-free viewing experience.",
    },
    {
      question: "How does the favorite playlist feature work?",
      answer:
        "You can mark up to 5 of your added playlists as favorites. This allows you to quickly access your top playlists, so you don’t have to search through all 20 to find the ones you use most often.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqsDemo.map((item, ind) => (
        <AccordionItem value={item.question} key={ind}>
          <AccordionTrigger className=" font-bold">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQs;
