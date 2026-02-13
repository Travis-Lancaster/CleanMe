## i18n

Internationalization uses [`react-i18next`](https://react.i18next.com/) development. Use the [`i18n Ally`](https://github.com/lokalise/i18n-ally) plugin in VS Code to get friendly internationalization hints.

Currently supports Chinese and English by default, source files are located in `src/locales`. If you need to add language support, make sure the file name is within the [ISO 639-1](https://www.andiamo.co.uk/resources/iso-language-codes/) specification, not just any name.

The file structure that needs to be included under a certain language is as follows:

```bash
├── locales
│   ├── README.md
│   ├── en-US
│   │   ├── authority.json             # Authority related, such as login page, etc.
│   │   ├── common.json                # Common fields, such as menu, button text, information prompts, etc.
│   │   ├── form.json                  # Form related, such as form fields, validation information, etc.
│   │   ├── preferences.json           # Preference settings related, such as theme, font size, etc.
│   │   ├── widgets.json               # Controls in preference settings, such as system updates, etc.
│   │   ├── -----------                # The following are page-level translation files
│   │   ├── system.json                # System management page
│   │   ├── home.json                  # Home page
│   │   ├── about.json                 # About page
│   │   └── personal-center.json       # Personal center
```

If you create a new route, just create a corresponding file.

## Internationalization Key Specification

The keys in the project's translation file JSON prefer nested style over flat style, for example:

```json
{
	"a": {
		"b": {
			"c": "..."
		}
	}
}
```

Of course you can also modify it to flat style as you wish.

For more information, please check the [Internationalization Section](https://condorheroblog.github.io/b2-gold/docs/zh/guide/advanced/locale).
