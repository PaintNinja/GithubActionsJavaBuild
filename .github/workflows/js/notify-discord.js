module.exports = ({github, context, env}) => {
    'use strict';
    const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    const { build_status, ref_type, ref_name, GIT_COMMIT_DESC } = process.env

    const title = capitalise(build_status)
    let colour
    switch (title) {
        case 'Success':
            colour = 2684508
            break
        case 'Failure':
        case 'Cancelled':
            colour = 16071719
            break
        case 'Started':
            colour = 3224808
            break
    }

    const json = {
        username: 'GitHub Actions',
        avatar_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        embeds: [{
            author: {
                name: context.payload.repository.name,
                url: context.payload.repository.html_url,
                icon_url: 'https://avatars.githubusercontent.com/u/1390178'
            },
            url: `${context.payload.repository.html_url}/actions/runs/${context.runId}`,
            title: `${title}`,
            color: `${colour}`,
            fields: []
        }]
    }

    let buildNumber = '???'
    const splitDesc = GIT_COMMIT_DESC.split('-');
    if (splitDesc.length > 1) {
        buildNumber = splitDesc[0] + '.' + splitDesc[1];
    }
    json.embeds[0].fields.push({
        name: 'Build number',
        value: buildNumber,
        inline: true
    })

    json.embeds[0].fields.push({
        name: `Build ${ref_type}`,
        value: `${ref_name}`,
        inline: true
    })

    if (title === 'Started') {
        json.embeds[0].fields.push({
            name: 'Commit message',
            value: `${context.payload.head_commit.message}`
        })
    }

    return JSON.stringify(json)
}