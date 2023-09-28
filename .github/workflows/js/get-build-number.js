module.exports = ({github, context}) => {
    const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    const { build_number, commit_desc, commit_tag } = process.env

    // if we have a build number, use it.
    if (build_number !== '???') return build_number

    // initialize fallback build number
    let buildNumber = '???'

    // split the description. assume tag-offset-sha.
    const splitDesc = commit_desc.split('-')

    // if the split desc has more than one -, it means it probably has the info we need
    if (splitDesc.length > 1) {
        buildNumber = splitDesc[0] + '.' + splitDesc[1]
    }

    return buildNumber;
}