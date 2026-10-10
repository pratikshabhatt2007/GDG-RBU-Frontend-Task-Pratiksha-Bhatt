import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };
const SUGGESTIONS = ["How do I join GDG?", "When is the next event?", "How can I reach you?"];

function linkify(text: string) {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) => {
    const m = part.match(/^(https?:\/\/\S*?)([.,;:!?)]*)$/);
    return m ? <span key={i}><a href={m[1]} target="_blank" rel="noopener noreferrer">{m[1]}</a>{m[2]}</span> : part;
  });
}

export default function AskGDG() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [msgs, busy]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8) }),
      });
      if (!r.ok || !r.body) {
        let err = "Something went wrong.";
        try { err = (await r.json()).error || err; } catch { /* not JSON */ }
        setMsgs([...next, { role: "assistant", content: err }]);
        return;
      }
      // show the answer word by word as it streams in
      const reader = r.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: acc }]);
      }
      if (!acc) setMsgs([...next, { role: "assistant", content: "Sorry, I could not answer that. Please email gdso@rknec.edu." }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Cannot reach the assistant. Please email gdso@rknec.edu." }]);
    } finally { setBusy(false); }
  }

  return (
    <div className="ask" onKeyDown={e => e.key === "Escape" && setOpen(false)}>
      {open && (
        <div className="ask-panel" role="dialog" aria-label="Ask GDG assistant">
          <div className="ask-head"><strong>Ask GDG</strong><button onClick={() => setOpen(false)} aria-label="Close assistant">✕</button></div>
          <div className="ask-msgs" aria-live="polite">
            {msgs.length === 0 && (
              <div>
                <p className="ask-b bot">Hi! Ask me about GDG RBU, events or how to join.</p>
                {SUGGESTIONS.map(s => <button key={s} className="ask-chip" onClick={() => send(s)}>{s}</button>)}
              </div>
            )}
            {msgs.map((m, i) => <p key={i} className={`ask-b ${m.role === "user" ? "me" : "bot"}`}>{linkify(m.content)}</p>)}
            {busy && msgs[msgs.length - 1]?.role === "user" && <p className="ask-b bot">Thinking…</p>}
            <div ref={endRef} />
          </div>
          <form className="ask-form" onSubmit={e => { e.preventDefault(); send(input); }}>
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} maxLength={300} placeholder="Type your question" aria-label="Your question" />
            <button type="submit" disabled={busy || !input.trim()}>Send</button>
          </form>
        </div>
      )}
      <button className="ask-fab" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close assistant" : "Open Ask GDG assistant"}>
        {open ? "✕" : "✦ Ask GDG"}
      </button>
    </div>
  );
}