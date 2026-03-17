'use client';
import { highlight } from 'sugar-high';
import { sections } from '@/data/sections';

function CodeBlock({ code }) {
  const highlighted = highlight(code);
  return (
    <pre className='bg-muted text-foreground text-xs font-mono p-4 rounded-[var(--radius)] border border-border overflow-x-auto mb-6'>
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  );
}

function InlineCode({ children }) {
  return (
    <code className='font-mono text-xs bg-muted text-foreground px-1 py-0.5 rounded-[var(--radius)]'>{children}</code>
  );
}

function renderHTML(html) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function SectionContent({ content }) {
  return (
    <>
      {content.map((block, i) => {
        if (block.type === 'p') {
          return (
            <p key={i} className='text-sm text-foreground leading-relaxed mb-4'>
              {renderHTML(block.text)}
            </p>
          );
        }
        if (block.type === 'label') {
          return (
            <p key={i} className='text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 mt-6'>
              {block.text}
            </p>
          );
        }
        if (block.type === 'code') {
          return <CodeBlock key={i} code={block.code} />;
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className='text-sm text-foreground leading-relaxed space-y-2 list-none pl-0 mb-4'>
              {block.items.map((item, j) => (
                <li key={j} className='border-l-2 border-border pl-4'>
                  {renderHTML(item)}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </>
  );
}

export default function ArticleSection() {
  return (
    <article>
      {sections.map((section, index) => (
        <div key={section.id}>
          <section id={section.id} className='mb-14'>
            <h2 className='text-base font-semibold mb-4'>
              {section.title}
            </h2>
            <SectionContent content={section.content} />
          </section>
          {index < sections.length - 1 && (
            <div className='border-t border-border mb-14' />
          )}
        </div>
      ))}
    </article>
  );
}
