    if (!commandName || commandName === 'all') {
      const categories = new Map();

      for (const [name, cmd] of commands) {
        if (cmd.config.role > 1 && role < cmd.config.role) continue;

        const category = cmd.config.category?.toUpperCase() || "GENERAL";
        if (!categories.has(category)) {
          categories.set(category, []);
        }
        categories.get(category).push({ name });
      }

      const sortedCategories = [...categories.keys()].sort();
      let replyMsg = this.langs.en.helpHeader.replace(/{prefix}/g, prefix);
      let totalCommands = 0;

      for (const category of sortedCategories) {
        const commandsInCategory = categories.get(category).sort((a, b) => a.name.localeCompare(b.name));
        totalCommands += commandsInCategory.length;

        replyMsg += this.langs.en.categoryHeader.replace(/{category}/g, category);

        commandsInCategory.forEach(cmd => {
          replyMsg += this.langs.en.commandItem.replace(/{name}/g, cmd.name) + "\n";
        });

        replyMsg += this.langs.en.helpFooter;
      }

      replyMsg += "\n" + this.langs.en.totalCommands.replace(/{total}/g, totalCommands);

      // تم حذف جزء إرسال الصورة تماماً
      return message.reply(replyMsg);
    }
