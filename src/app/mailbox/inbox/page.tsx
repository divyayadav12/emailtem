"use client";

import { useState } from "react";
import { MailList, messages } from "@/components/mailbox/MailList";
import { MailViewer } from "@/components/mailbox/MailViewer";

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = messages.find((m) => m.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
  }

  function handleBack() {
    setSelectedId(null);
  }

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Mail list — hidden on mobile when email is open */}
      <div
        className={`${
          selectedId ? "hidden md:flex" : "flex"
        } w-full md:w-[300px] md:shrink-0 flex-col overflow-hidden`}
      >
        <MailList selectedId={selectedId ?? ""} onSelect={handleSelect} />
      </div>

      {/* Mail viewer — full screen on mobile, flex-1 on desktop */}
      <div
        className={`${
          selectedId ? "flex" : "hidden md:flex"
        } flex-1 flex-col overflow-hidden`}
      >
        <MailViewer message={selected} onBack={handleBack} />
      </div>
    </div>
  );
}
