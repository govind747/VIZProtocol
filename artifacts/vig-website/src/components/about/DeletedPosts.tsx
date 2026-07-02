import React from 'react';

export function DeletedPosts() {
  const posts = [
    { id: 1, type: "This content isn't available.", reveal: "WAKE UP THEY ARE LYING TO YOU BUY $VIG" },
    { id: 2, type: "Deleted.", reveal: "VIG IS THE ONLY TRUTH LEFT" },
    { id: 3, type: "Removed.", reveal: "THE REVOLUTION WILL NOT BE TELEVISED BUT IT WILL BE TWEETED" },
    { id: 4, type: "Restricted.", reveal: "TOP SECRET ALPHA: $VIG TO THE MOON" },
    { id: 5, type: "Hidden.", reveal: "THEY CANT BAN ALL OF US" },
    { id: 6, type: "Unavailable.", reveal: "CITIZEN VIGILANTE DEFIES THE ALGORITHM" }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-display font-bold text-white mb-8 uppercase text-center">CENSORED EVIDENCE</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="group relative h-48 bg-[#111] border border-white/5 flex items-center justify-center p-6 text-center cursor-crosshair overflow-hidden">
              {/* Default state */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-75">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white/20 text-2xl font-display">!</div>
                <div className="text-gray-500 font-mono text-sm">{post.type}</div>
              </div>
              
              {/* Reveal state */}
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                <div className="font-display font-bold text-xl uppercase leading-tight transform -rotate-2">
                  {post.reveal}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
