'use client";'

import { useState } from "react";
import { Sound } from "@/utils/constants";
import { Mail } from "lucide-react";
import Section from "../Section/Section";
import NeonCard from "../NeonCard/NeonCard";
import TerminalInput from "../TerminalInput/TerminalInput";
import TerminalTextarea from "../TerminalTextarea/TerminalTextarea";
import ConsoleFrame from "../ConsoleFrame/ConsoleFrame";


export default function Contact() {
  const [sent, setSent] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const logPush = (l: string) => setLog((v) => [...v, l]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setSent(true);
    // Simulated transmission log + real call
    logPush("$ transmit --secure contact.json");
    logPush("[handshake] initializing…");
    Sound.play(Sound.beep);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        logPush("[200] delivered to relay: ok");
        logPush('result: "message queued"');
      } else {
        logPush(`[${res.status}] error: ${data?.error || "unknown"}`);
        logPush("fallback: email me at your@email");
      }
    } catch (err: unknown) {
      logPush("[net] transport failed");
      logPush("fallback: email me at your@email");
    }
    logPush("done.");
  }

  return (
    <Section id="contact" className="py-24">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
        <Mail className="h-6 w-6" /> Contact
      </h2>
      <NeonCard>
        <div className="p-6">
          {!sent ? (
            <form className="grid gap-4 max-w-xl" onSubmit={onSubmit}>
              <TerminalInput label="Your Name" name="name" />
              <TerminalInput label="Your Email" name="email" type="email" />
              <TerminalInput label="Subject" name="subject" />
              <TerminalTextarea label="Your Message" name="message" />
              <button
                className="rounded-xl bg-white text-black hover:bg-white/90 w-max p-2 flex align-items-center"
                onMouseEnter={() => Sound.play(Sound.key)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send
              </button>
            </form>
          ) : (
            <ConsoleFrame title="tx://contact">
              <div className="font-mono text-sm space-y-1">
                {log.map((l, i) => (
                  <div key={i}>{l}</div>
                ))}
                <div className="text-white/40">▮</div>
              </div>
            </ConsoleFrame>
          )}
        </div>
      </NeonCard>
    </Section>
  );
}
