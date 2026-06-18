"use client";

import { useState } from "react";
import { MailList, messages } from "@/components/mailbox/MailList";
import { MailViewer } from "@/components/mailbox/MailViewer";

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState(messages[0].id);
  const selected = messages.find((m) => m.id === selectedId);

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Email list panel — fixed width */}
      <div className="w-[300px] shrink-0 overflow-hidden">
        <MailList selectedId={selectedId} onSelect={setSelectedId} />
      </div>
      {/* Email viewer — fills remaining space */}
      <MailViewer message={selected} />
    </div>
  );
}
